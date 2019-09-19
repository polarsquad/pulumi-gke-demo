"use strict";
import * as k8s from "@pulumi/kubernetes";
import * as pulumi from "@pulumi/pulumi";
import { k8sConfig, k8sProvider } from "./cluster";

const name = `${pulumi.getProject()}-${pulumi.getStack()}`;
const nginxLabels = { app: `nginx-${name}` };
const nginxDeployment = new k8s.apps.v1.Deployment("nginx", {
    spec: {
        selector: { matchLabels: nginxLabels },
        replicas: 1,
        template: {
            metadata: { labels: nginxLabels },
            spec: { containers: [{ name, image: "nginx" }] },
        },
    },
}, { provider: k8sProvider });

const nginxService = new k8s.core.v1.Service("nginx-service", {
    metadata: {
        name: "nginx-service",
        labels: nginxLabels
    },
    spec: {
        ports: [{ port: 80, targetPort: 80 }],
        selector: nginxLabels,
        type: "LoadBalancer"
    }
}, { provider: k8sProvider});

const nginxIngress = new k8s.networking.v1beta1.Ingress("nginx-ingress", {
    metadata: {
        name: "nginx-ingress"
    },
    spec: {
        backend: {
            serviceName: nginxService.metadata.name,
            servicePort: 80
        }
    }
}, { provider: k8sProvider});

// Export the Kubeconfig so that clients can easily access our cluster.
export let kubeConfig = k8sConfig;