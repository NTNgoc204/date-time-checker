# Date Time Checker

Ứng dụng kiểm tra ngày tháng với giao diện người dùng thân thiện.

## Tính năng chính

1. **Giao diện người dùng (GUI)**
   - Thiết kế hiện đại, dễ sử dụng
   - Responsive trên mọi thiết bị
   - Hỗ trợ dark/light mode

2. **Kiểm tra ngày tháng (CheckDate)**
   - Xác thực định dạng ngày tháng
   - Kiểm tra tính hợp lệ của ngày
   - Hỗ trợ nhiều định dạng ngày tháng

3. **Xác thực đầu vào (Input Validation)**
   - Kiểm tra định dạng đầu vào
   - Hiển thị thông báo lỗi rõ ràng
   - Ngăn chặn dữ liệu không hợp lệ

## CI/CD Pipeline

Dự án sử dụng GitHub Actions để tự động hóa quy trình phát triển:

1. **Continuous Integration**
   - Tự động chạy tests khi có push/PR
   - Kiểm tra build
   - Kiểm tra code quality

2. **Continuous Deployment**
   - Tự động deploy lên GitHub Pages
   - Chỉ deploy khi merge vào main branch
   - Kiểm tra tính ổn định trước khi deploy

## Hướng dẫn Demo

### 1. Demo GUI
- Mở ứng dụng và giới thiệu giao diện
- Thử nghiệm responsive design
- Demo dark/light mode

### 2. Demo CheckDate
- Nhập các ngày hợp lệ
- Nhập các ngày không hợp lệ
- Hiển thị kết quả kiểm tra

### 3. Demo Input Validation
- Nhập các định dạng khác nhau
- Kiểm tra thông báo lỗi
- Demo real-time validation

### 4. Demo CI/CD
- Push code lên repository
- Kiểm tra GitHub Actions
- Xem kết quả deploy

## Cài đặt và Chạy

```bash
# Cài đặt dependencies
npm install

# Chạy development server
npm start

# Chạy tests
npm test

# Build cho production
npm run build
```

## Áp dụng cho Project Khác

Để áp dụng CI/CD cho project khác:

1. Copy file `.github/workflows/ci.yml`
2. Điều chỉnh các bước build và test
3. Cập nhật các biến môi trường
4. Kích hoạt GitHub Actions trong repository mới

## Contributing

Mọi đóng góp đều được hoan nghênh. Vui lòng tạo issue hoặc pull request.
