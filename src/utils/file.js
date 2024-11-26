/**
 * 将JSON对象转换为File对象
 * @param jsonData 示例：{
 *     name: 用户自定义,
 *     image: 图片base64数据,
 *     description: 用户自定义输入 + This digital collection was created by 0xbfd86cc5c6fe5caffc394c0b50188e16bde660a7（用户地址） on DimAI, collection DimID: 2023051632403242c07d6dd5313193d8e04abca40bc5b13（img_id）.
 *   }
 * @param fileName 使用图片的img_id即可
 * @returns {File}
 */
export function convertJsonToFile(jsonData, fileName) {
  const jsonDataString = JSON.stringify(jsonData)
  const blob = new Blob([jsonDataString], { type: 'application/json' })
  const file = new File([blob], fileName, { type: 'application/json' })
  return file
}
