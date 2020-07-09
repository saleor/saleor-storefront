#!/bin/bash
usage="usage: $(basename "$0") [-h] LABEL [API_URI]"

if [ "$1" == "-h" ]; then
    echo $usage 
    exit 0
fi

if [ $# -lt 1 ]; then
    echo "Error: Missing argument: LABEL"
    echo $usage 
    exit 1
fi

DOMAIN="$1.storefront.saleor.rocks"
API_URI=${2:-$API_URI}

if [ -z $API_URI ]; then
    echo "Error: Missing argument or env variable: API_URI"
    echo $usage 
    exit 1
fi

# API_URI=$API_URI npm run build \
aws s3 sync dist s3://test-envs-stack-storefrontsbf9ec55f-4q9rxi8vjmo9/$DOMAIN \
&& aws cloudfront create-invalidation --distribution-id E1CH7YXEIA2RM --paths "/$DOMAIN/*" \
&& echo https://$DOMAIN
