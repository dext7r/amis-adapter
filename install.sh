#!/bin/bash

echo "开始安装依赖并打包项目"
echo "当前目录: $(pwd)"
echo "删除node_modules pnpm-lock.yaml pnpm-workspace.yaml dist目录"

rm -rfv node_modules pnpm-lock.yaml pnpm-workspace.yaml dist
ls -l

# 检查是否删除成功
if [ $? -eq 0 ]; then
  echo "删除成功！"
else
  echo "删除失败！"
fi

touch install.log
# 记录开始时间
start_time=$(date +%s)

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

# 安装构建项目
install_and_build() {
  # 记录开始时间
  start_build_time=$(date +%s)
  echo "当前时间: $(date +%Y-%m-%d_%H:%M:%S)"
  echo "正在执行 $1 项目安装和构建操作"
  cd "$1" && rm -rf dist yarn.lock && yarn install >/dev/null 2>&1 && yarn build >/dev/null 2>&1 && cd -
  echo "当前时间: $(date +%Y-%m-%d_%H:%M:%S)"
  echo "执行 $1 项目安装和构建操作完成"
  # 计算耗时并显示
  end_build_time=$(date +%s)
  build_duration=$((end_build_time - start_build_time))
  echo "依赖安装和打包耗时: ${build_duration} 秒"
}

# 执行函数安装和构建项目
install_and_build "./examples/vue-editor2.7"
install_and_build "./examples/vue-amis-editor-webpack"

# 创建目录
mkdir -p dist/vue-amis-editor-webpack dist/staticVue-amis-editor-webpack
mkdir -p dist/vue-editor2.7 dist/staticVue-editor2.7

# 移动文件
cp -r examples/vue-editor2.7/dist/* dist/vue-editor2.7/
cp -r examples/vue-editor2.7/dist/staticVue-editor2.7/* dist/staticVue-editor2.7/
cp -r examples/vue-amis-editor-webpack/dist/* dist/vue-amis-editor-webpack/
cp -r examples/vue-amis-editor-webpack/dist/* dist/staticVue-amis-editor-webpack/

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
echo "依赖安装和打包耗时: ${duration} 秒"

current_user=$(whoami)
if [[ "$current_user" == *"h7ml"* ]]; then
    echo "当前用户为 $current_user，包含 'h7ml'，不执行 git reset 操作。"
else
    echo "当前用户为 $current_user，不包含 'h7ml'，执行 git reset 操作。"
    echo "当前目录: $(pwd)"
    git reset --hard $(git rev-parse --short HEAD)
    ls -l
fi
# 成功后退出
exit 0
