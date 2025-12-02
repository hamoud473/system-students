# 1) نستخدم صورة Node
FROM node:18

# 2) نحدد فولدر العمل داخل الكونتينر
WORKDIR /app

# 3) ننسخ ملفات المشروع
COPY package*.json ./
RUN npm install

# 4) ننسخ باقي الملفات
COPY . .

# 5) تشغيل التطبيق
CMD ["npm", "start"]

# 6) فتح البورت
EXPOSE 3000