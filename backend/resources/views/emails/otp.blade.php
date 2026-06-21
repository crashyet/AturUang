<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kode Verifikasi Atur Uang</title>
    <style>
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background-color: #f8fafc;
            color: #1e1e1e;
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
        }
        .container {
            max-width: 500px;
            margin: 40px auto;
            background: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
            border: 1px solid #e2e8 Slate;
        }
        .header {
            background-color: #FF8E42;
            padding: 32px;
            text-align: center;
        }
        .header h1 {
            color: #ffffff;
            margin: 0;
            font-size: 24px;
            font-weight: 800;
            letter-spacing: -0.5px;
        }
        .content {
            padding: 40px 32px;
            text-align: center;
        }
        .content p {
            font-size: 15px;
            color: #575757;
            line-height: 1.6;
            margin-top: 0;
            margin-bottom: 24px;
        }
        .otp-container {
            background-color: #fff7ed;
            border: 2px dashed #FF8E42;
            border-radius: 12px;
            padding: 16px 24px;
            display: inline-block;
            margin-bottom: 24px;
        }
        .otp-code {
            font-size: 32px;
            font-weight: 800;
            letter-spacing: 6px;
            color: #FF8E42;
            margin: 0;
        }
        .footer {
            background-color: #fafafa;
            padding: 24px 32px;
            text-align: center;
            border-top: 1px solid #f1f5f9;
        }
        .footer p {
            font-size: 12px;
            color: #94a3b8;
            margin: 0;
            line-height: 1.5;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Atur Uang</h1>
        </div>
        <div class="content">
            <p>Halo,</p>
            <p>Terima kasih telah menggunakan <strong>Atur Uang</strong>. Gunakan kode verifikasi di bawah ini untuk menyelesaikan pendaftaran Anda:</p>
            <div class="otp-container">
                <div class="otp-code">{{ $otp }}</div>
            </div>
            <p style="font-size: 13px; color: #94a3b8; margin-bottom: 0;">Kode verifikasi ini berlaku selama <strong>5 menit</strong>. Jangan bagikan kode ini kepada siapapun demi keamanan akun Anda.</p>
        </div>
        <div class="footer">
            <p>&copy; {{ date('Y') }} Atur Uang. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
