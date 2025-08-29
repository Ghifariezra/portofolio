import axios from "axios";

export async function toBase64(url: string): Promise<string> {
    const response = await axios.get(url, {
        responseType: "arraybuffer", // penting supaya dapat data mentah
    });
    
    const base64 = Buffer.from(response.data, "binary").toString("base64");

    // deteksi format dari URL, default ke webp jika tidak ada
    const extensionMatch = url.match(/\.(png|jpe?g|webp)$/i);
    const ext = extensionMatch ? extensionMatch[1] : "webp";

    return `data:image/${ext};base64,${base64}`;
}
