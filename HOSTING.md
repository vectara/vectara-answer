## Hosting vectara-answer

This guide provides specific instructions to help you host your `vectara-answer` application on one of the popular hosting providers.

We keep adding new hosting providers regularly - please let us know if you need instructions for a hosting provider that is not yet included.

### Overview

To run a hosted version of `vectara-answer` you would need to have a configuration folder as specified in the [README](README.md), including:

* `config.yaml` which specifies the configuration parameters for your application
* `queries.json` which specifies the pre-defined set of queries
* `secrets.toml` which includes the profile used to access the API KEY

In some cases, additional files such as a log image might be included in the config folder, but at a minimum you would need the 3 files mentioned above.

In the following we will assume you have the configuration folder named `config` ready to go.

### deploy vectara-answer on AWS

To deploy vectara-answer on AWS we will use AWS Cloud Formation. 

First, we create a YAML file that defines our application:

```yaml
Resources:
    MyTaskDefinition:
        Type: 'AWS::ECS::TaskDefinition'
        Properties:
        ContainerDefinitions:
            - Name: vanswer
            Image: vectara/vectara-answer:latest
            Memory: 16
            Cpu: 4
            MountPoints:
                - ContainerPath: /usr/src/app/build/queries.json
                SourceVolume: queries_volume
            Environment:
                - TBD: load .env file
            PortMappings:
                - HostPort: 80
                ContainerPort: 3000
            LinuxParameters:
                InitProcessEnabled: true

    MyService:
        Type: 'AWS::ECS::Service'
        Properties:
            Cluster: my-vanswer-cluster
            DesiredCount: 1
            TaskDefinition: !Ref MyTaskDefinition

    QueriesVolume:
        Type: 'AWS::ECS::Volume'
        Properties:
            Name: queries_volume
            Host:
                SourcePath: TBD - /local/path/to/queries.json
```

Once the yaml file is ready, you can deploy to AWS by issueing the following command:

`aws cloudformation create-stack --stack-name MyStack --template-body file://my-template.yaml`


### deploy vectara-answer on GCP

### deploy vectara-answer on Azure

### deploy vectara-answer on Heroku

### deploy vectara-answer on Render

