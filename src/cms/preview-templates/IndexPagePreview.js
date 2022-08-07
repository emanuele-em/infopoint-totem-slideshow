import React from 'react'


/* -------------------------------------------------------------------------- */
/*                                  functions                                 */
/* -------------------------------------------------------------------------- */

function isImage(url) {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg|jfif)$/.test(url);
}

const IndexPagePreview = ({ entry, getAsset }) => {
    const data = entry.getIn(['data']).toJS();
    let count = 0;
    if (data) {
        return (
            <>
                <div id="containerLogo">
                    <img src="/img/logo-evolutha.png" />
                </div>

                <h1>Anteprima Presentazione</h1>
                {
                    data.slideshow
                        .map((item) => { 
                            const start = new Date(item.start);
                            const end = new Date(item.end);
                            const hidden = (Date.now()>end || Date.now() < start) ? 1 : 0;
                            console.log(hidden);
                            count++;                          
                            return (
                                <div class="container">
                                    <div class="containerMedia">
                                        <div class="numeration">{count}</div>
                                        {
                                            (isImage(item.slide)) ? <img src={item.slide} alt="" /> : <video autoPlay muted playsInline src={item.slide} />
                                        }
                                    </div>
                                    <div class="description">
                                        <p><b>Durata</b>: {item.duration} secondi</p>
                                        <p><b>Data inizio</b>: {start.toLocaleString("it-IT")}</p>
                                        <p><b>Data fine</b>: {end.toLocaleString("it-IT")}</p>
                                        <p class={hidden ? "hidden" : "online"}>{hidden ? "Nascosto" : "Pubblicato"}</p>
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