#!/bin/bash

# 记录开始时间
start_time=$(date +%s)

# 设置环境变量
# 设置环境变量
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux 系统
    export PUBLIC_PATH_PREFIX='/amis-adapter/'
elif [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS 系统
    export PUBLIC_PATH_PREFIX='/amis-adapter/'
elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    # Windows 系统
    if [[ "$PROCESSOR_ARCHITECTURE" == "x86" ]]; then
        # 32位Windows系统
        export PUBLIC_PATH_PREFIX='/amis-adapter/'
    elif [[ "$PROCESSOR_ARCHITECTURE" == "AMD64" ]]; then
        # 64位Windows系统
        export PUBLIC_PATH_PREFIX='/amis-adapter/'
    else
        echo "Unsupported architecture"
        exit 1
    fi
else
    echo "Unsupported operating system"
    exit 1
fi


# 输出环境变量值
echo "PUBLIC_PATH_PREFIX set to: $PUBLIC_PATH_PREFIX"

# 清除 dist 目录
rm -rf dist

# 构建文档和示例项目并压缩
pnpm build:docs || true
pnpm build:examples:vue2.7 || true
pnpm build:examples:vue-editor2.7 || true

# 创建目录
mkdir -p dist/dist/vue2.7 dist/dist/staticVue2.7
mkdir -p dist/dist/vue-editor2.7 dist/dist/staticVue-editor2.7
mkdir -p dist/dist/amis-editor-react dist/dist/static-amis-editor-react

# 移动文件
# 判断并移动文件
if [ -d "packages/docs/doc" ]; then
    mv packages/docs/doc/* dist/dist/
fi

if [ -d "examples/vue2.7/dist" ]; then
    cp -r examples/vue2.7/dist/* dist/dist/vue2.7/
fi

if [ -d "examples/vue2.7/dist/staticVue2.7" ]; then
    cp -r examples/vue2.7/dist/staticVue2.7/* dist/dist/staticVue2.7/
fi

if [ -d "examples/vue-editor2.7/dist" ]; then
    cp -r examples/vue-editor2.7/dist/* dist/dist/vue-editor2.7/
fi

if [ -d "examples/vue-editor2.7/dist/staticVue-editor2.7" ]; then
    cp -r examples/vue-editor2.7/dist/staticVue-editor2.7/* dist/dist/staticVue-editor2.7/
fi

if [ -d "examples/amis-editor-react/dist" ]; then
    cp -r examples/amis-editor-react/dist/* dist/dist/amis-editor-react/
fi

if [ -d "examples/amis-editor-react/dist/static-amis-editor-react" ]; then
    cp -r examples/amis-editor-react/dist/static-amis-editor-react/* dist/dist/static-amis-editor-react/
fi

echo "文件移动完成"

# 计算压缩前文件大小并显示
echo "压缩前文件大小:"
du -sh dist

# 压缩 dist 目录中的所有文件
find dist -type f \( -name "*.js" -o -name "*.css" -o -name "*.html" -o -name "*.svg" -o -name "*.json" \) -exec gzip -k -f {} \;

# 计算压缩后文件大小并显示
echo "压缩后文件大小:"
du -sh dist

# 计算耗时并显示
end_time=$(date +%s)
duration=$((end_time - start_time))
echo "构建和压缩耗时: ${duration} 秒"

echo "🏃🏻‍♀️ vue2.7 && amis@6.3.0 基于vue@2.7和amis@6.3.0 使用示例 https://amis-adapter.h7ml.cn/vue2.7"
echo "🌍 vue2.7 && amis-editor@5.2.0 基于vue@2.7和amis-editor@5.2.0 使用示例 https://amis-adapter.h7ml.cn/vue-editor2.7/"
echo "🎨 vue3 && amis-editor@5.2.0 基于vue@3 和amis-editor@5.2.0 使用示例 https://amis-editor-webpack.h7ml.cn/"
echo "🔥 react@18 && amis-editor@5.2.0 基于react@18 和amis-editor@5.2.0 使用示例 https://amis-adapter.h7ml.cn/amis-editor-react"

# 实时日志输出
if [ -f "/var/log/*/*.log" ]; then
    # 日志文件存在，执行实时日志输出
    tail -f /var/log/*/*.log
else
    # 日志文件不存在，输出提示信息
    echo "日志文件不存在，无法输出实时日志。"
fi

# 成功后退出
exit 0
