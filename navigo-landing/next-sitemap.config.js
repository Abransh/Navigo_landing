/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://trynavigo.com',
    generateRobotsTxt: true,
    exclude: ['/admin/*'],
    robotsTxtOptions: {
      additionalSitemaps: [
        'https://trynavigo.com/server-sitemap.xml',
      ],
    },
  }