import { Config } from "@pulumi/pulumi";

const config = new Config();

// what GCP region to run the cluster in
export const gcpRegion = config.get("gcpRegion") || "europe-north1";

// username is the admin username for the cluster.
export const username = config.get("username") || "admin";

// password is the password for the admin user in the cluster.
export const password = config.require("password");

// what machine type to use for the Kubernetes nodes in the node pool
export const nodeMachineType = config.get("nodeMachineType") || "n1-standard-1";

// how many nodes in the node pool
export const poolNodeCount = config.getNumber("poolNodeCount") || 1;

// what version of Kubernetes to run (GKE versioning)
// See e.g. https://cloud.google.com/kubernetes-engine/docs/release-notes
export const gkeKubeVersion = config.get("gkeKubeVersion") || "1.14.3-gke.11";