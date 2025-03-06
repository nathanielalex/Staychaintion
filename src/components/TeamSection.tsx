"use client"

import type React from "react"
import { motion } from "framer-motion"
import { FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa"

interface TeamMember {
  name: string
  role: string
  image: string
  linkedin: string
  instagram: string
  github: string
}

const teamMembers: TeamMember[] = [

  {
    name: "Stanley Nathanael Wijaya",
    role: "Frontend and AI Dev",
    image: "./images/team/StanleyNW.jpg",
    linkedin: "https://www.linkedin.com/in/stanley-nathanael-wijaya",
    instagram: "https://instagram.com/snw.77",
    github: "https://github.com/StyNW7",
  },
  {
    name: "Nathaniel Alexander",
    role: "Motoko Developer",
    image: "/images/team/Nathaniel.png",
    linkedin: "https://www.linkedin.com/in/nathaniel-alexander-a33530226/",
    instagram: "https://instagram.com/nathaniel.alexander",
    github: "https://github.com/nathanielalex",
  },
  {
    name: "Stanley Jonathan Wahjudi",
    role: "Motoko Developer",
    image: "/images/team/StanleyJW.png",
    linkedin: "https://www.linkedin.com/in/stanley-jonathan-wahjudi-4b418128a/",
    instagram: "https://instagram.com/stanley__jw",
    github: "https://github.com/StanleyJo-37",
  },
  {
    name: "Jason Melvin Hartono",
    role: "Motoko Developer",
    image: "/images/team/Jason.png",
    linkedin: "https://www.linkedin.com/in/jason-melvin-hartono-07329328b/",
    instagram: "https://instagram.com/jason689melvin",
    github: "https://github.com/123jason689",
  },
  {
    name: "Colin Oliver",
    role: "Motoko Developer",
    image: "/images/team/Colin.jpg",
    linkedin: "https://www.linkedin.com/in/colin-oliver-7b311830b/",
    instagram: "https://instagram.com/cowlo655",
    github: "https://github.com/SolidGluten",
  },

]

const TeamSection: React.FC = () => {

  return (

    <section className="max-w-7xl mx-auto">

      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center mb-12 text-indigo-900"
      >
        Our Amazing Team
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-center">

        {teamMembers.map((member, index) => (
            
          <motion.div
            key={member.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
          >

            <div className="hover:scale-105 transition-transform duratioon-300">
                <img
                src={member.image || "/placeholder.svg"}
                alt={member.name}
                className="w-full h-64 object-cover object-center"
                />
                <div className="p-6">
                <h3 className="text-xl font-semibold text-indigo-900">{member.name}</h3>
                <p className="text-indigo-600 mb-4">{member.role}</p>
                <div className="flex justify-center space-x-4">
                    <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-indigo-600 transition-colors"
                    >
                    <FaLinkedin size={24} />
                    </a>
                    <a
                    href={member.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-indigo-600 transition-colors"
                    >
                    <FaInstagram size={24} />
                    </a>
                    <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-indigo-600 transition-colors"
                    >
                    <FaGithub size={24} />
                    </a>
                </div>
                </div>
            </div>

          </motion.div>

        ))}

      </div>

    </section>

  )

}

export default TeamSection

