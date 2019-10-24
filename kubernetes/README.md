###### Certificate creation using certbot from letsencyrpt

```
sudo certbot certonly \
    --manual \
    --preferred-challenges=dns \
    --email your@email.com \
    --server https://acme-v02.api.letsencrypt.org/directory \
    --agree-tos \
    -d *.example.domain
```

###### DNS changes.
- create TXT record in Cloud DNS - acme_challenge. 
- Wait for 3-5 mins for letscnrypt to validate the challenge. 

###### Create secret in kubernetes

```
kubectl create secret tls ${CERT_NAME} --key ${KEY_FILE} --cert ${CERT_FILE}
```

###### update secret in the ingress file. 

```
spec:
  tls:
    - secretName: ${CERT_NAME} 
```