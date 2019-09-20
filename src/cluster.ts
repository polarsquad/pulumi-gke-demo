"use strict"
import * as gcp from "@pulumi/gcp"
import * as k8s from "@pulumi/kubernetes"
import * as pulumi from "@pulumi/pulumi"
import { gcpRegion,
  username,
  password,
  nodeMachineType,
  gkeKubeVersion,
  poolNodeCount } from "./config"

const stackName = pulumi.getStack()

export const cluster = new gcp.container.Cluster(`${stackName}-cluster`, {
  initialNodeCount: 1,
  nodeVersion: gkeKubeVersion,
  minMasterVersion: gkeKubeVersion,
  location: gcpRegion,
  masterAuth: {
    clientCertificateConfig: {
      issueClientCertificate: false,
    },
    username,
    password
  },
  removeDefaultNodePool: true,
})

export const nodes = new gcp.container.NodePool(`${stackName}-nodes`, {
  cluster: cluster.name,
  location: gcpRegion,
  nodeConfig: {
    machineType: nodeMachineType,
    metadata: {
      "disable-legacy-endpoints": "true",
    },
    oauthScopes: [
      "https://www.googleapis.com/auth/logging.write",
      "https://www.googleapis.com/auth/monitoring",
    ],
    preemptible: true,
  },
  nodeCount: poolNodeCount
})

export const k8sConfig = pulumi.
  all([ cluster.name, cluster.endpoint, cluster.masterAuth ]).
  apply(([ name, endpoint, auth ]) => {
    const context = `${gcp.config.project}_${gcp.config.zone}_${name}`
    return `apiVersion: v1
clusters:
- cluster:
    certificate-authority-data: ${auth.clusterCaCertificate}
    server: https://${endpoint}
  name: ${context}
contexts:
- context:
    cluster: ${context}
    user: ${context}
  name: ${context}
current-context: ${context}
kind: Config
preferences: {}
users:
- name: ${context}
  user:
    auth-provider:
      config:
        cmd-args: config config-helper --format=json
        cmd-path: gcloud
        expiry-key: '{.credential.token_expiry}'
        token-key: '{.credential.access_token}'
      name: gcp
`
  })

// Export a Kubernetes provider instance that uses our cluster from above.
export const k8sProvider = new k8s.Provider("gkeK8s", {
  kubeconfig: k8sConfig,
})
