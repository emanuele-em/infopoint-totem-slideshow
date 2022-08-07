import React from 'react'


/* -------------------------------------------------------------------------- */
/*                                  functions                                 */
/* -------------------------------------------------------------------------- */

function isImage(url) {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg|jfif)$/.test(url);
}

const IndexPagePreview = ({ entry, getAsset }) => {
    const data = entry.getIn(['data']).toJS();
    console.log(data.slideshow);

    if (data) {
        return (
            <>
                {
                    data.slideshow
                        .map((item) => {
                            return (
                                <div class="container">
                                    <div class="containerMedia">
                                        {
                                            (isImage(item.slide)) ? <img src={item.slide} alt="" /> : <video autoPlay muted playsInline src={item.slide} />
                                        }
                                    </div>
                                    <div class="description">
                                        <p>{item.duration}</p>
                                        <p>{item.start}</p>
                                        <p>{item.end}</p>
                                    </div>
                                </div>
                            )
                        })

                }
            </>
        )
    } else {
        return <div>Aggiornamento...</div>
    }
}

export default IndexPagePreview