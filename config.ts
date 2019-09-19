import { Config } from "@pulumi/pulumi"

const config = new Config()

// What GCP region to run the cluster in
export const gcpRegion = config.get("gcpRegion") || "europe-north1"

// Username is the admin username for the cluster.
export const username = config.get("username") || "admin"

// Password is the password for the admin user in the cluster.
export const password = config.require("password")

// What machine type to use for the Kubernetes nodes in the node pool
export const nodeMachineType = config.get("nodeMachineType") || "n1-standard-1"

// How many nodes in the node pool
export const poolNodeCount = config.getNumber("poolNodeCount") || 1

// What version of Kubernetes to run (GKE versioning)
// See e.g. https://cloud.google.com/kubernetes-engine/docs/release-notes
export const gkeKubeVersion = config.get("gkeKubeVersion") || "1.14.3-gke.11"

// How many replicas of NGINX to run
export const nginxReplicas = config.getNumber("nginxReplicas") || 1

// Which tag of the NGINX image to run
export const nginxImageTag = config.get("nginxImageTag") || "1.17.3"
