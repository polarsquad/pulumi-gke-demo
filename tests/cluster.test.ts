import * as gcp from "@pulumi/gcp"
import * as pulumi from "@pulumi/pulumi"
import { cluster, nodes } from "../src/cluster"

const stackName = pulumi.getStack()

describe("cluster specs", () => {
  test("should run specific K8s version", async () => {
    const cluster = await gcp.container.getCluster({
      location: "europe-north1",
      name: stackName
    })
    const version = cluster.masterVersion
    expect(version).toEqual("1")
  })
})
