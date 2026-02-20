

interface SEOProps {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: string;
}

const SEO = ({
    title = 'Borboletas de Coimbra',
    description = 'Um guia digital dedicado à identificação e preservação da biodiversidade de borboletas na região de Coimbra.',
    image = '/logo.webp', // Default absolute path for production
    url,
    type = 'website'
}: SEOProps) => {
    const siteUrl = 'https://borboletasdecoimbra.pt';
    const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
    const fullImage = image.startsWith('http') ? image : `${siteUrl}${image.startsWith('/') ? '' : '/'}${image}`;

    return (
        <>
            {/* Standard metadata */}
            <title>{title}</title>
            <meta name='description' content={description} />
            <link rel='canonical' href={fullUrl} />

            {/* Open Graph / Facebook */}
            <meta property='og:type' content={type} />
            <meta property='og:url' content={fullUrl} />
            <meta property='og:title' content={title} />
            <meta property='og:description' content={description} />
            <meta property='og:image' content={fullImage} />

            {/* Twitter */}
            <meta name='twitter:card' content='summary_large_image' />
            <meta name='twitter:url' content={fullUrl} />
            <meta name='twitter:title' content={title} />
            <meta name='twitter:description' content={description} />
            <meta name='twitter:image' content={fullImage} />
        </>
    );
};

export default SEO;
