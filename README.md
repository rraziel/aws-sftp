# AWS SFTP

Sample project that uses [Terraform]'s [CDK] with [TypeScript] to provision an [S3 bucket] acting as an [SFTP server].

1. [Install](#install)
2. [Configure](#configure)
3. [Deploy](#deploy)

## Install

The necessary dependencies can be installed with [Npm]:

```sh
npm install
```

## Configure

The `sftp.json` file contains all settings for the provisioning:

```json
{
  "region": "us-east-1",
  "profile": "example-profile",
  "bucket": "example-bucket-name",
  "domain": {
    "name": "ftp.example.org",
    "zone": "example.org"
  },
  "roles": {
    "logging": "ftp_logging",
    "user": "ftp_user"
  },
  "tags": {
    "environment": "FTP"
  },
  "users": {
    "keysPath": "./keys",
    "userNames": ["user1", "user2"]
  }
}
```

The following settings are available:

| Path              | Mandatory | Description                                                       |
| :---------------- | :-------- | :---------------------------------------------------------------- |
| `region`          | Yes       | AWS region used for the deployment                                |
| `profile`         | Yes       | AWS profile used for the deployment                               |
| `bucket`          | Yes       | Name of the S3 bucket that should will be created for the server. |
| `domain.name`     | No        | Domain name that will be used to access the server.               |
| `domain.zone`     | No        | Route 53 zone where the domain name will be created.              |
| `roles.logging`   | Yes       | IAM role name that will be used for the server logging role.      |
| `roles.user`      | Yes       | IAM role name that will be used for the server access role.       |
| `tags.*`          | No        | Default tags used for resources created with the AWS provider.    |
| `users.keysPath`  | Yes       | Directory that holds public keys for the users.                   |
| `users.userNames` | No        | List of user names.                                               |

Public keys are loaded from `<users.keysPath>/<user-name>.pub`, e.g. given:

```json
{
  "users": {
    "keysPath": "./keys",
    "userNames": ["user1", "user2"]
  }
}
```

Then the following public keys will be loaded:

- `./keys/user1.pub`
- `./keys/user2.pub`

The users will have their home directory set to `/user1` and `/user2` on the bucket.

## Deploy

The stack is deployed using the `deploy` npm script, which has the CDK executing the TypeScript code to generate a JSON
representation of the Terraform stack, then deploying it once `yes` is entered:

```sh
$ npm run deploy

Stack: ftp
Resources
 + AWS_IAM_ROLE         logging             aws_iam_role.logging
 + AWS_IAM_ROLE         transfer_user       aws_iam_role.transfer_user
 + AWS_IAM_ROLE_POLICY  logging_policy      aws_iam_role_policy.logging_policy
 + AWS_IAM_ROLE_POLICY  transfer_policy     aws_iam_role_policy.transfer_policy
 + AWS_ROUTE53_RECORD   domain_record       aws_route53_record.domain_record
 + AWS_S3_BUCKET        s3bucket            aws_s3_bucket.s3bucket
 + AWS_TRANSFER_SERVER  server              aws_transfer_server.server

Diff: 7 to create, 0 to update, 0 to delete.

Do you want to perform these actions?
 CDK for Terraform will perform the actions described above.
 Only 'yes' will be accepted to approve.

 Enter a value:
```

Note: two additional resources are created for each defined user.

Once the resources have been provisioned, the Terraform output includes the necessary information to access the server:

```sh
Output: bucket = {
          "arn": "arn:aws:s3:::<bucket-name>",
          "domain": "<bucket-domain-name>"
        }
        domain = {
          "name": "<domain-name>"
        }
        ftp = {
          "endpoint": "<transfer-server-id>.server.transfer.<region>.amazonaws.com",
          "fingerprint": "<transfer-server-fingerprint>",
          "logs": "/aws/transfer/<transfer-server-id>",
          "protocols": [
            "SFTP"
          ]
        }
```

[cdk]: https://github.com/hashicorp/terraform-cdk
[npm]: https://www.npmjs.com/
[s3 bucket]: https://aws.amazon.com/s3/
[sftp server]: https://en.wikipedia.org/wiki/SSH_File_Transfer_Protocol
[terraform]: https://www.terraform.io/
[typescript]: https://www.typescriptlang.org/
