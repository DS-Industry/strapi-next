module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: 'strapi-provider-upload-yandex-cloud',
      providerOptions: {
        endpoint: 'https://storage.yandexcloud.net',
        accessKeyId: env('YANDEX_CLOUD_ACCESS_KEY_ID'),
        secretAccessKey: env('YANDEX_CLOUD_ACCESS_SECRET'),
        region: env('YANDEX_CLOUD_REGION'),
        params: {
          Bucket: env('YANDEX_CLOUD_BUCKET'),
          CacheControl: "public, max-age=864000"
        },
      },
    },
  },
});