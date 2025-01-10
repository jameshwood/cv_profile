import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["modal", "modalContent"];

  connect() {
    console.log("Project Modal Controller connected!");
  }

  show(event) {
    const projectId = event.currentTarget.dataset.modalId; // Get project ID
    const project = this.getProjectData(projectId); // Retrieve project data

    if (!project) {
      console.error(`No project found for ID: ${projectId}`);
      return;
    }

    let content = `<h3>${project.title}</h3>`;
    project.snapshots.forEach((snapshot) => {
      content += `<div class="project-snapshot">
                    <img src="${snapshot.img}" alt="Snapshot">
                    <p>${snapshot.description}</p>
                  </div>`;
    });

    content += `<button class="close-btn" data-action="click->project-modal#close">✕</button>`;

    this.modalContentTarget.innerHTML = content;
    this.modalTarget.classList.remove("d-none"); // Show modal
  }

  close(event) {
    // Check if click is outside the modal content or triggered by close button
    if (event.target === this.modalTarget || event.target.classList.contains("close-btn")) {
      this.modalTarget.classList.add("d-none"); // Hide modal
    }
  }

  getProjectData(projectId) {
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

    return projectData[projectId];
  }
}
