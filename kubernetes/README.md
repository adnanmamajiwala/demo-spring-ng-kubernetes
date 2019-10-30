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
    1. Create a service account 
       ```
       kubectl create serviceaccount --namespace kube-system tiller
       ```
    2. Create a cluster role binding access for tiller
       ```
       kubectl create clusterrolebinding tiller-cluster-rule \
                --clusterrole=cluster-admin \
                --serviceaccount=kube-system:tiller
       ```
    3. Initialize with the created service account 
       ```
       helm init --service-account tiller
       ```

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
helm install --name innoventing-jenkins stable/jenkins --values jenkins-values.yml
```

##### Installing Nginx
For detailed instructions visit [nginx helm charts](https://github.com/helm/charts/tree/master/stable/nginx-ingress)
```
helm install --name nginx-ingress stable/nginx-ingress \
    --set rbac.create=true \
    --set controller.publishService.enabled=true \
    --set controller.service.externalIPs={static IP}
```

Add below config in application ingress
```
    kubernetes.io/ingress.class: "nginx"
    ingress.kubernetes.io/force-ssl-redirect: "true"
```
