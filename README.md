# Pulumi demo using GKE and TypeScript

This demonstrates using Pulumi to create a Kubernetes cluster in Google Cloud
Platform (GCP) with Google Kubernetes Engine (GKE).

You can find instructions for installing the Pulumi CLI in the [Pulumi
documentation](https://www.pulumi.com/docs/get-started/).

## Usage

Install dependencies using npm:

```bash
npm install
```

With Pulumi, an instance of infrastructure created from a given codebase is
called a "stack". You can create several stacks from the same codebase. For
instance, you could create stacks called dev, staging and prod.

Initialize a stack called `dev`:

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

You can also configure aspects of what is deployed using `pulumi config set`.
For example:

```bash
pulumi config set nginxReplicas 3
pulumi config set nginxImageTag 1.17.3-alpine
```

For a full list of config options see `config.ts`.
