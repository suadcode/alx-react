const path = require('path');

module.exports = {
    entry: './src/index.js',          // مسار الملف الأساسي
    output: {
        filename: 'bundle.js',        // اسم ملف الخرج
        path: path.resolve(__dirname, 'dist')  // مسار مجلد الخرج
    },
    mode: 'development'                // وضع التطوير
};

