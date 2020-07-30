#!/bin/bash

WORK_DIR=`pwd`
TEMP_DIR="../`date "+%Y%m%d%H%M%S"`"
TODAY=`date "+%Y%m%d"`
# echo $TEMP_DIR
if [ $# -gt 0 ] 
then
    WORK_DIR=$1
fi

`mkdir $TEMP_DIR`

for dir in `ls -d $WORK_DIR/*/`
do
    CS_FILES=(`ls $dir | grep .cs`)

    if [ ${#CS_FILES[@]} -le 0 ]
    then
        echo "$dir에 .cs 파일이 없습니다."
    else
        `cp ${dir}*".cs" ${TEMP_DIR}`
    fi
done

`zip -j ${TODAY}.zip ${TEMP_DIR}/*`
`rm -rf ${TEMP_DIR}`
`scp -P 1136 ${TODAY}.zip j136@192.168.0.11:/backup`
`rm ${TODAY}.zip`
