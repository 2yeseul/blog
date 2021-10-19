---
title: 'ktor 를 통해 mutlpart 파일 업로드 하기'
date: 2021-10-19 00:00:00
description: "무한삽질기록"
tags: [Kotlin]
thumbnail:
---   
# ktor 를 통해 mutlpart 파일 업로드 하기

사실 진짜 별거 아닌데.. 공식 문서를 보고도 별 생각없이 내 맘대로 변형해서 말그대로 개 삽질을 했다.

아 사실 삽질한 이유가 좀 더 있는데.. 아직 코루틴에 대해 잘 알지는 못하지만, ktor에서 file 업로드를 위해 사용하는 메서드인 `submitFormWithBinaryData` 는 코루틴과 관련되어 있어서, 의존성이 추가되지 않았다면 추가해주어야 한다.


오늘의 교훈은 무슨 일이 있어도 공식 레퍼런스부터 따라해보자 ^^!! (ㅎ..)

코드도 몇 줄 되지 않는다.. `multipart` 를 통해 request가 들어오면, 해당 multipart file을 Files.createTempFile을 통해 임시저장 하여 File 객체로 변환한다.

그 후 그냥 공식 문서대로 올리기만 하면 끝이다..😫 

나 같은 경우엔 `Multipart`를 `File` 객체로 변환하는 유틸을 간단하게 만들어주었다.

``` kotlin
object MultipartFileConverter {
    fun MultipartFile.convert(): File {
        val name = this.originalFilename.toString()

        val ext = name.substring(name.lastIndexOf("."))
        val filename = name.substring(0, name.lastIndexOf("."))
        val path = Files.createTempFile(filename, ext)

        this.transferTo(path)
        return path.toFile()
    }
}
```

``` Kotlin
suspend fun uploadFile(multipartFile: MultipartFile): String {
        val multipartClient = HttpClient(CIO)
        val file = multipartFile.convert()
        val response = multipartClient.submitFormWithBinaryData<HttpResponse>(
            url = "$endpoint/your-api",
            formData = formData {
                append("file", file.readBytes(), Headers.build {
                    append(HttpHeaders.ContentType, Files.probeContentType(file.toPath()))
                    append(HttpHeaders.ContentDisposition, "filename=${file.name}")
                })
            }
        )

``` 

주의할 점.. Header `ContentType`과 `ContentDisposition` 두 개 다 써주어야 한다. 나는 정말 개쪼렙이라 아무생각 없이 바꾸고 수정하고 빼보고 더해보고 다해봤다가 그냥 공식 코드 그대로 써보니 바로 잘 되어서..정말 반성을 많이했다 ㅎㅎ;

요약
> 공식 문서나 제대로 보자

---

공식 레퍼런스 주소 - https://ktor.io/docs/request.html#upload_file

공식 repo 주소 - https://github.com/ktorio/ktor-documentation/blob/main/codeSnippets/snippets/client-upload-file/src/main/kotlin/com/example/Application.kt

