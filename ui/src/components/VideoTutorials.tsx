export const VideoTutorials: React.FC = () => {
  return (
    <div>
      <div className="faqpage-wrapper">
        <div className="faqpage-question">
          Create simple query: RB 1000 yard seasons for 2020
        </div>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/JCv5EUSzQAI?si=jiBMoLs3agF8EdWd"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen={true}
        ></iframe>
      </div>
      <div className="faqpage-wrapper">
        <div className="faqpage-question">Edit your query</div>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/z_V_FYpnNcA?si=7BLMz1-oeJPBwZFG"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
      <div className="faqpage-wrapper">
        <div className="faqpage-question">
          WR games with more than 15 targets for specific teams over range of
          seasons
        </div>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/rzxPYvGPhY4?si=xO2KWMiEGW7uM4uL"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen={true}
        ></iframe>
      </div>

      <div className="faqpage-wrapper">
        <div className="faqpage-question">
          Players with over 1000 yards rushing in 2019 for Baltimore
        </div>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/lxWVW66Mvr8?si=KPCg_SxWVtXVTO0s"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen={true}
        ></iframe>
      </div>

      <div className="faqpage-wrapper">
        <div className="faqpage-question">2000 yard rushing seasons*</div>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/oYwnt9h4nfY?si=lFiHbt91uP6lY-Pd"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen={true}
        ></iframe>
        <p>
          * Our data only goes back to the year 2000. Thus, no Eric Dickerson in
          results
        </p>
      </div>
    </div>
  );
};
