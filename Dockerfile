FROM nginx:alpine

# 将静态页面拷贝到 Nginx 默认目录
COPY ./docs /usr/share/nginx/html

# 暴露 80 端口
EXPOSE 80

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]
