#### Certificate creation using certbot from letsencyrpt

```
sudo certbot certonly \
    --manual \
    --preferred-challenges=dns \
    --email your@email.com \
    --server https://acme-v02.api.letsencrypt.org/directory \
    --agree-tos \
    -d *.example-domain.com
```

- create a TXT record in Cloud DNS to complete the acme_challenge from certbot. 

**_Note: Wait for 3-5 mins before continuing with letscnrypt to validate the challenge._** 

#### Create secret in kubernetes

```
kubectl create secret tls ${CERT_NAME} --key ${KEY_FILE} --cert ${CERT_FILE}
```

#### update secret in the ingress file. 

```
spec:
  tls:
    - secretName: ${CERT_NAME} 
```

#### Using HELM charts

For detail helm instructions visit the [HELM's website](https://helm.sh/docs/helm/)

1. To install helm in your local macOS  `brew install kubernetes-helm`
2. To install tiller in kubernetes
    1. run `helm init` 
    2. Apply the role based access config `kubectl apply -f rbac-config.yml` to give access to tiller 
    3. run `helm init --upgrade --service-account tiller`

Now we are ready to install releases from helm charts

##### Installing Mysql
For detailed instructions visit [mysql helm charts](https://github.com/helm/charts/tree/master/stable/mysql)
```
helm install --name example-mysql \
    --set mysqlRootPassword=exampleRootPassword,mysqlUser=exampleUser,mysqlPassword=exampleUserPassword,mysqlDatabase=exampleSchemaName \
    stable/mysql
```


##### Installing Jenkins
For detailed instructions visit [jenkins helm charts](https://github.com/helm/charts/tree/master/stable/jenkins)
```
helm install --name example-jenkins \
    --set master.adminPassword=examplePassword \
    --set master.ingress.enabled=true \
    --set master.ingress.hostName=jenkins.example-domain.com \
    --set 'master.ingress.tls[0].secretName=exampleSecretName' \
    --set 'master.ingress.tls[0].hosts={jenkins.example-domain.com}' \
    stable/jenkins
```
