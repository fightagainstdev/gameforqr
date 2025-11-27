import base64

def mp3_to_base64(mp3_file_path):
    """将MP3文件转换为Base64编码字符串"""
    try:
        with open(mp3_file_path, 'rb') as mp3_file:
            mp3_data = mp3_file.read()
            base64_encoded = base64.b64encode(mp3_data).decode('utf-8')
            return base64_encoded
    except Exception as e:
        print(f"转换失败: {e}")
        return None

def save_base64_to_js(base64_string, output_file):
    """将Base64字符串保存为JavaScript文件"""
    js_content = f"""// 自动生成的Base64音频数据
const LIGHT_MP3_BASE64 = "{base64_string}";

function getAudioData(songName) {{
    if (songName === "LIGHT") {{
        return LIGHT_MP3_BASE64;
    }}
    return null;
}}
"""
    try:
        with open(output_file, 'w', encoding='utf-8') as js_file:
            js_file.write(js_content)
        print(f"Base64数据已保存到: {output_file}")
        print(f"数据长度: {len(base64_string)} 字符")
    except Exception as e:
        print(f"保存失败: {e}")

if __name__ == "__main__":
    # 转换light.mp3
    base64_string = mp3_to_base64("light.mp3")
    if base64_string:
        save_base64_to_js(base64_string, "audio_data.js")
        print("转换完成！")
    else:
        print("转换失败！")