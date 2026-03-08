"use client";
import { useState } from 'react';
import { MdPlayArrow } from 'react-icons/md';
import AlertPopup from '../AlertPopup';
import Modal from '../Modal';

export default function TrailerBtn({ trailer }: { trailer: any }) {
  const [showTrailerModal, setShowTrailerModal] = useState(false)
  const [alertMessage, setAlertMessage] = useState<React.ReactNode | string>("")

  function trailerBtnClick() {
    if (trailer) {
      setShowTrailerModal(true)
    } else {
      setAlertMessage(<div>Trailer not available</div>)
    }
  }

  return (<>
    <AlertPopup message={alertMessage} />

    <button
      id="playTrailer"
      className="inline-flex items-center justify-center pl-3.5 pr-4 py-2.5 text-sm rounded-md cursor-pointer bg-gray-600/70 shadow-sm backdrop-blur-xl text-white hover:bg-gray-600/85 transition-colors border border-gray-300/10"
      onClick={trailerBtnClick}
    >
      <MdPlayArrow className="mr-2 size-6 mb-0.25" />
      Play Trailer
    </button>

    <Modal
      isOpen={showTrailerModal}
      onClose={() => setShowTrailerModal(false)}
    >
      <div className='relative h-[80vh] w-[80vw]'>
        <iframe
          className='w-full h-full'
          src={`https://www.youtube.com/embed/${trailer?.key}?autoplay=1`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen>
        </iframe>
      </div>
    </Modal>
  </>)
}