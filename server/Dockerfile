FROM openjdk:8-jdk-alpine

RUN addgroup -S generics && adduser -S saroj -G generics
USER saroj:generics

WORKDIR /home/saroj

ENV JAR_NAME generics-1.0.0.jar

COPY build/libs/${JAR_NAME} ${JAR_NAME}

CMD [ "sh", "-c", "java ${JAVA_OPTS} -jar ${JAR_NAME}" ]
    