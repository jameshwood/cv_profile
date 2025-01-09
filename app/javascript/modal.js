const projectData = {
  solar: {
    title: "Solar Farm Mapping System",
    snapshots: [
      { img: "solar1.png", description: "Interface for identifying ideal solar farm locations." },
      { img: "solar2.png", description: "Automated report generation using input coordinates." },
    ],
    details: [
      "Built pre-bootcamp using self-taught knowledge.",
      "Designed to optimize the process of identifying solar farm locations.",
      "Provided interactive mapping tools with efficiency improvements.",
    ],
  },
  petbnb: {
    title: "Petbnb - Pet Rental Platform",
    snapshots: [
      { img: "pet1.png", description: "Homepage with user-friendly pet rental listings." },
      { img: "pet2.png", description: "Booking and payment integration." },
    ],
    details: [
      "Developed during the bootcamp as part of a group project.",
      "Modeled after Airbnb, but for renting pets.",
      "Implemented search filters, user authentication, and reviews.",
    ],
  },
  streaming: {
    title: "Streaming Assistant",
    snapshots: [
      { img: "streaming1.png", description: "Personalized watchlist dashboard." },
      { img: "streaming2.png", description: "Content rating algorithm showing media scores." },
      { img: "streaming3.png", description: "Custom schedule generation based on preferences." },
    ],
    details: [
      "Personal side project showcasing advanced algorithms.",
      "Built a content-ranking algorithm for personalized media suggestions.",
      "Provides a watch schedule based on input providers and watchlists.",
      "Tracks monthly streaming habits and adjusts recommendations accordingly.",
    ],
  },
};

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.querySelector("#projectModal");
  const modalContent = document.querySelector(".modal-content");
  const closeModal = document.querySelector(".close-modal");

  // Open modal when project is clicked
  document.querySelectorAll(".project-item").forEach((item) => {
    item.addEventListener("click", (event) => {
      const projectId = event.currentTarget.dataset.modalId; // Data attribute for project
      const project = projectData[projectId]; // Assume you have project data available
      let content = `<h3>${project.title}</h3>`;
      project.snapshots.forEach((snapshot) => {
        content += `<div class="project-snapshot">
                      <img src="${snapshot.img}" alt="Snapshot">
                      <p>${snapshot.description}</p>
                    </div>`;
      });
      modalContent.innerHTML = content;
      modal.classList.add("active"); // Show modal
    });
  });

  // Close modal
  closeModal.addEventListener("click", () => {
    modal.classList.remove("active");
  });
});
