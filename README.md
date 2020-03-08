# CORS-demonstration
通过node.js编程搞懂cors相关知识
# 跨域的解决方案之CORS
## HTTP背景知识
### 简单请求

------------


若请求满足所有下述条件，则该请求可视为“简单请求”：

######1.使用下列方法之一：
GET
HEAD
POST

######2.Fetch 规范定义了对 CORS 安全的首部字段集合，不得人为设置该集合之外的其他首部字段。该集合为：
Accept
Accept-Language
Content-Language
Content-Type （需要注意额外的限制）
DPR
Downlink
Save-Data
Viewport-Width
Width
Content-Type 的值仅限于下列三者之一：
text/plain
multipart/form-data
application/x-www-form-urlencoded
###### 3.请求中的任意XMLHttpRequestUpload 对象均没有注册任何事件监听器；XMLHttpRequestUpload 对象可以使用 XMLHttpRequest.upload 属性访问。

###### 4.请求中没有使用 ReadableStream 对象。
###预检请求

------------


**     “需预检的请求”要求必须首先使用 OPTIONS   方法发起一个预检请求到服务器，以获知服务器是否允许该实际请求。"预检请求“的使用，可以避免跨域请求对服务器的用户数据产生未预期的影响。**
**当请求满足下述任一条件时，即应首先发送预检请求：**

######1.使用了下面任一 HTTP 方法：
PUT
DELETE
CONNECT
OPTIONS
TRACE
PATCH
######2.人为设置了对 CORS 安全的首部字段集合之外的其他首部字段。该集合为：
Accept
Accept-Language
Content-Language
Content-Type (需要注意额外的限制)
DPR
Downlink
Save-Data
Viewport-Width
Width
######3.Content-Type 的值不属于下列之一:
application/x-www-form-urlencoded
multipart/form-data
text/plain
######4.请求中的XMLHttpRequestUpload 对象注册了任意多个事件监听器。
######5.请求中使用了ReadableStream对象。

###附带身份凭证的请求

------------
浏览器不会发送身份凭证信息。如果要发送凭证信息，需要设置 XMLHttpRequest 的某个特殊标志位。

*附带身份凭证的请求与通配符*
对于附带身份凭证的请求，服务器不得设置 Access-Control-Allow-Origin 的值为“*”。

这是因为请求的首部中携带了 Cookie 信息，如果 Access-Control-Allow-Origin 的值为“*”，请求将会失败。而将 Access-Control-Allow-Origin 的值设置为某个具体域，则请求将成功执行。

另外，响应首部中也携带了 Set-Cookie 字段，尝试对 Cookie 进行修改。如果操作失败，将会抛出异常。


## 代码演示说明

