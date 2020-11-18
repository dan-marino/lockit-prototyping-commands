import { iam } from "../../aws/services.js";

const detachGroupPolicy = (groupName, policyArn) => {
  const params = {
    GroupName: groupName,
    PolicyArn: policyArn,
  };

  return iam.detachGroupPolicy(params).promise();
}

const deletePolicy = policyArn => {
  const params = {
    PolicyArn: policyArn,
  };

  return iam.deletePolicy(params).promise();
}

const teardownPolicies = async () => {
  const params = {
    MaxItems: "100",
    OnlyAttached: false, // temporary
    PathPrefix: "/Lockit/",
  };

  const list = await iam.listPolicies(params).promise();

  list.Policies.map(async policy => {
    await detachGroupPolicy(policy.PolicyName, policy.Arn); // group name has same name as policy
    deletePolicy(policy.Arn);
  });
};

export default teardownPolicies;