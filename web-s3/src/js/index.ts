import { S3Client, ListObjectsCommand, GetObjectCommand, GetObjectOutput } from "@aws-sdk/client-s3";
// import { Test } from "./test";

type GetObjectResult = GetObjectOutput | null;

const s3Client = new S3Client({
    region: "sa-east-1",
    credentials: { accessKeyId: "AKIATW2UWFGU6JI4GDPZ", secretAccessKey: "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" },
});

async function getObject(Bucket: string, Key: string | undefined | null): Promise<GetObjectResult> {
    if (!Key) return null;

    const command = new GetObjectCommand({ Bucket, Key });

    return s3Client.send(command);
}

async function getObjectBytes(item: GetObjectResult) {
    if (item?.Body?.constructor !== ReadableStream) return null;

    const { value } = await item.Body.getReader().read();

    return value;
}

async function run() {
    const divBucket = document.querySelector(".bucket");
    const bucket = await s3Client.send(new ListObjectsCommand({ Bucket: "rjaskonis-data" }));
    // const data = await s3Client.send(new ListBucketsCommand({  }));

    // console.log(data);
    console.log(bucket);

    bucket.Contents?.forEach(async (content) => {
        const div = document.createElement("div");
        const link = document.createElement("a");
        div.className = "bucket-object";

        // (div as any).innerText = content.Key;

        // divBucket?.appendChild(div);

        console.log(content.Key);

        const item = await getObject("rjaskonis-data", content.Key);
        const bytes = await getObjectBytes(item);
        const blob = new Blob([bytes], { type: item?.ContentType });
        const url = window.URL.createObjectURL(blob);

        link.href = url;
        link.text = content.Key as string;
        link.download = content.Key as string;

        (div.style as any) = "padding: 8px 4px";
        div.appendChild(link);
        divBucket?.appendChild(div);
    });
}

run();
