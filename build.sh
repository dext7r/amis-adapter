#!/bin/bash

echo "开始安装依赖并打包项目"
echo "还原到 header 分支: $(git rev-parse --short HEAD)"
echo "当前 commit message: $(git log --format=%B -n 1 HEAD)"
echo "当前 commit author: $(git log --format=%an -n 1 HEAD)"
echo "当前 commit author email: $(git log --format=%ae -n 1 HEAD)"
echo "当前 commit date: $(git log --format=%ad -n 1 HEAD)"
echo "当前 commit hash: $(git rev-parse --short HEAD)"
echo "当前 commit branch: $(git rev-parse --abbrev-ref HEAD)"

ls -l

touch build.log

# 获取当前用户名
current_user=$(whoami)
# 判断当前用户名是否包含 "h7ml"
if [[ "$current_user" == *"h7ml"* ]]; then
    echo "当前用户为 $current_user，包含 'h7ml'，不执行 git reset 操作。"
else
    echo "当前用户为 $current_user，不包含 'h7ml'，执行 git reset 操作。"
    echo "当前目录: $(pwd)"
    git reset --hard $(git rev-parse --short HEAD)
    ls -l
fi
# 设置环境变量
export PUBLIC_PATH_PREFIX='/amis-adapter/'

# 输出环境变量值
echo "PUBLIC_PATH_PREFIX set to: $PUBLIC_PATH_PREFIX"

# 安装构建项目
install_and_build() {
    # 记录开始时间
    start_build_time=$(date +%s)
    echo "当前时间: $(date +%Y-%m-%d_%H:%M:%S)"
    echo "正在执行命令 pnpm $1"
    pnpm $1
#    pnpm $1 > /dev/null 2>&1 && cd -
    echo "当前时间: $(date +%Y-%m-%d_%H:%M:%S)"
    echo "执行 pnpm $1 完成"
    # 计算耗时并显示
    end_build_time=$(date +%s)
    build_duration=$((end_build_time - start_build_time))
    echo "依赖安装和打包耗时: ${build_duration} 秒"
}

# 执行函数安装和构建项目
install_and_build "install"
install_and_build "build:docs"
install_and_build "build:examples:vue2.7"
install_and_build "build:examples:amis-editor-react"

# 创建目录
mkdir -p dist/vue2.7 dist/staticVue2.7
mkdir -p dist/vue-editor2.7 dist/staticVue-editor2.7
mkdir -p dist/amis-editor-react dist/static-amis-editor-react

# 移动文件
cp -r packages/docs/doc/* dist/
cp -r examples/vue2.7/dist/* dist/vue2.7/
cp -r examples/vue2.7/dist/staticVue2.7/* dist/staticVue2.7/
cp -r examples/amis-editor-react/dist/* dist/amis-editor-react/
cp -r examples/amis-editor-react/dist/static-amis-editor-react/* dist/static-amis-editor-react/

echo "文件移动完成"

# 计算压缩前文件大小并显示
echo "压缩前文件大小:"
du -sh dist

# 压缩文件
find dist -type f \( -name "*.js" -o -name "*.css" -o -name "*.html" -o -name "*.svg" -o -name "*.json" \) -exec gzip -k -f {} \;

# 计算压缩后文件大小并显示
echo "压缩后文件大小:"
du -sh dist

# 计算耗时并显示
end_time=$(date +%s)
duration=$((end_time - start_time))
echo "构建和压缩耗时: ${duration} 秒"

# 输出提示信息
echo "🏃🏻‍♀️ vue2.7 && amis@6.3.0 基于vue@2.7和amis@6.3.0 使用示例 https://amis-adapter.h7ml.cn/vue2.7"
echo "🌍 vue2.7 && amis-editor@5.2.0 基于vue@2.7和amis-editor@5.2.0 使用示例 https://amis-adapter.h7ml.cn/vue-editor2.7/"
echo "🎨 vue3 && amis-editor@5.2.0 基于vue@3 和amis-editor@5.2.0 使用示例 https://amis-editor-webpack.h7ml.cn/"
echo "🔥 react@18 && amis-editor@5.2.0 基于react@18 和amis-editor@5.2.0 使用示例 https://amis-adapter.h7ml.cn/amis-editor-react"

# 实时日志输出
if [ -f "build.log" ]; then
    # 日志文件存在，执行实时日志输出
    echo "实时日志输出:"
    tail -f ./build.log
    exit 0
else
    # 日志文件不存在，输出提示信息
    echo "日志文件不存在，无法输出实时日志。"
    exit 0
fi

# 成功后退出
exit 0
