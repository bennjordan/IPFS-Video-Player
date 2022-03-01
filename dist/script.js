// Setting HLS Config values
Hls.DefaultConfig.loader = HlsjsIpfsLoader
Hls.DefaultConfig.debug = false

async function P2PMagic () {
  if (!Hls.isSupported()) {
    return displayError(new Error('Your Browser does not support the HTTP Live Streaming Protocol'))
  }
//video should automatically size to fit
  const video = document.getElementById('video')
//video filename is guanguan.mov
//actual link https://ipfs.io/ipfs/QmdSM1wn5nUs4ujGSQbRSMkTRB55qVQUQe7AYFiE6QkLPx?filename=guagan.mov

//hoping we only need CID
  const GUAGANCIDCID = 'QmdSM1wn5nUs4ujGSQbRSMkTRB55qVQUQe7AYFiE6QkLPx'  
  
  // Create IPFS node inside your browser
  let node;
  // Init a new repo for this
  const repoPath = 'ipfs-' + Math.random()
  try {
    // Instatiate IPFS node
    node = await Ipfs.create({ repo: repoPath })
  } catch(err) {
    displayError(err)
  }

  const hls = new Hls()
  hls.config.ipfs = node
  hls.config.ipfsHash = GUAGANCID
  hls.loadSource('master.m3u8')
  hls.attachMedia(video)
  hls.on(Hls.Events.MANIFEST_PARSED, () => video.play())
}

function displayError(err) {
  const modalElement = document.getElementById('modal');
  modalElement.style.display = 'flex';

  const errStr = String(err).toLowerCase();
  const spanElement = document.getElementById('errorText');

  spanElement.innerHTML = errorStr.includes('SecurityError'.toLowerCase()) 
    ? 'You must use Chrome or Firefox to use this embedded app!' 
    : 'Uh oh! Something went wrong. See the console to get further details.';
}

P2PMagic()