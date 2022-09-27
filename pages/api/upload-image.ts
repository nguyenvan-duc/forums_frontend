// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { buffer } from 'micro'

import cloudinary from 'cloudinary'
cloudinary.v2.config({
  cloud_name: 'dc9c9z2ri',
  api_key: '998596363616345',
  api_secret: 'cEgfkcCeMDbDnI_z2UAiUbDLsyo',
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method !== 'POST') {
    return res.status(404).json({ message: 'method not supported' })
  }
  const body: any = (await buffer(req)).toString()
  let { data } = JSON.parse(body)
  const uploadResponse = await cloudinary.v2.uploader.upload(data, {
    resource_type: 'image',
    upload_preset: 'ml_default',
    folder: `image-from-posts`,
  })
  console.log(uploadResponse)
  return res.status(200).json(uploadResponse.secure_url)
}
