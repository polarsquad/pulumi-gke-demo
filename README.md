# Pulumi demo using GKE and TypeScript

This demonstrates using Pulumi to create a Kubernetes cluster in Google Cloud
Platform (GCP) with Google Kubernetes Engine (GKE).

## Usage

With Pulumi, an instance of infrastructure created from a given codebase is
called a "stack". You can create several stacks from the same codebase. For
instance, you could create stacks called dev, staging and prod.

First initialize a stack called `dev`:

```bash
pulumi stack init dev
```

You'll also need to set some stack specific configuration options:

```bash
pulumi config set gcp:project <gcp project to use>  # Where to deploy
pulumi config set pulumi-gke-demo:password --secret # Admin pass for K8s
```

You can then spin up your infrastructure:

```bash
pulumi up
```
