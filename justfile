version := `cat package.json | jq .version`

system-info:
    @echo "system info: {{ os() }} ({{ os_family() }}) on {{arch()}}".

build-production:
    @docker build -f Dockerfile.prod -t wildflowerschools/wf-liberation-map:{{version}} .

run-local:
    npm start

run:
    docker-compose -f stack.yml up -d --build

run-prod: build-production
    docker run -it --rm -p 3000:80 wildflowerschools/wf-liberation-map:{{version}}

format:
    npm run fmt

#tag:
#    git tag {{version}} main
#    git push origin {{version}}
#
#docker-push: build-production
#    #!/usr/bin/env bash
#    if [[ `uname -m` == 'arm64' ]]; then
#      build_cmd="docker buildx build --platform linux/amd64,linux/arm64 "
#    else
#      build_cmd="docker build"
#    fi
#    `${build_cmd} -f Dockerfile.prod --push -t wildflowerschools/wf-liberation-map:{{version}} .`
#
#release: tag docker-push

version:
    @echo {{version}}