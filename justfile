version := `cat package.json | jq .version`

system-info:
    @echo "system info: {{ os() }} ({{ os_family() }}) on {{arch()}}".

build-production:
    docker build -f Dockerfile.prod -t wildflowerschools/wf-liberation-map:{{version}} .

run:
    docker-compose -f stack.yml up -d --build

tag:
    git tag {{version}} main
    git push origin {{version}}

docker-push: build-production
    @docker push wildflowerschools/wf-liberation-map:{{version}}

release: tag docker-push

version:
    @echo {{version}}