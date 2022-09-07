FROM nginx
#RUN mkdir /usr/share/nginx/html/dist
RUN rm /etc/nginx/conf.d/default.conf
ADD ./frontDocker/default.conf /etc/nginx/conf.d/
COPY ./frontDocker/dist/ /usr/share/nginx/html/
#COPY ./frontDocker/dist/ /usr/share/nginx/html/
# 用本地的 nginx.conf 配置来替换nginx镜像里的默认配置
#COPY ./frontDocker/nginx.conf /etc/conf.d/nginx.conf