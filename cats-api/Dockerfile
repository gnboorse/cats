FROM golang:1.12.7-alpine AS builder
ARG buildTimestamp
ARG buildVersion
RUN apk --update add ca-certificates git
RUN mkdir -p /go/src/github.com/gnboorse/cats-api
WORKDIR $GOPATH/src/github.com/gnboorse/cats-api

COPY main.go .
COPY routes.go .
COPY data.go .
COPY repository.go .

RUN go get -u github.com/gorilla/mux
RUN go get -u github.com/lib/pq

ENV TIME=${buildTimestamp}
ENV VERSION=${buildVersion}
RUN GOOS=linux CGO_ENABLED=0 go build -ldflags="-w -s -X 'main.BuildTimestamp=$TIME' -X 'main.BuildVersion=$VERSION'" -o /go/bin/api .

FROM scratch

WORKDIR /go/bin/

COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/ca-certificates.crt
COPY --from=builder /go/bin/api .

ENTRYPOINT [ "./api" ]