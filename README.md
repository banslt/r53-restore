# route53-restore

Format raw dumped json list of recordsets to paginated changebatch that can be used with aws route53 cli

## Usage:

- Split into changebatches: ``npm start <records-list-path>``

- Apply changeBatches: ``aws route53 change-resource-record-sets --hosted-zone-id <ZONE-ID-HERE> --change-batch file://$(pwd)/changeBatch<NB>.json``   *(Note that there is a throttling of 5 requests per second per AWS account)*
