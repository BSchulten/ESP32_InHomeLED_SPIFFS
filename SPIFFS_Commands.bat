mkspiffs.exe -c website -b 4096 -p 256 -s 0x16F000 spiffs.bin

esptool.exe --chip esp32 --port COM5 --baud 115200 write_flash -z 0x291000 spiffs.bin