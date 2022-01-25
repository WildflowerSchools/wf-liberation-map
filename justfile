version := `cat package.json | jq .version`

system-info:
    @echo "system info: {{ os() }} ({{ os_family() }}) on {{arch()}}".

build-production:
    docker build -f Dockerfile.prod -t wf-liberation-map:{{version}} .

run:
    docker-compose -f stack.yml up -d --build

docker-push: build-production
    @docker push wildflowerschools/wf-liberation-map:{{version}}

version:
    @echo {{version}}