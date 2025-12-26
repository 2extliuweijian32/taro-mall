# 使用说明
1. 安装[ASCF命令行工具](https://developer.huawei.com/consumer/cn/doc/atomic-ascf/run-ascf-cli)（如果已经安装，则该步骤可以忽略）
2. 修改ascf-project/AppScope/app.json5中的bundleName字段，将{app_id}替换为正式的元服务appId
3. 使用[DevEco Studio](https://developer.huawei.com/consumer/cn/download/)打开`ascf-project`工程，进行签名（连接真机或模拟器，在菜单栏上依次选择File > Project Structure > Project > Signing Configs选项，然后勾选Automatically generate signature选项，即可完成签名）
4. 运行`npm run build:ascf && npm run run:ascf` 
