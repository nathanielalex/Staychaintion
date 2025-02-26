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
    role: "Frontend Developer",
    image: "./images/team/StanleyNW.jpg",
    linkedin: "https://www.linkedin.com/in/stanley-nathanael-wijaya",
    instagram: "https://instagram.com/snw.77",
    github: "https://github.com/StyNW7",
  },
  {
    name: "Jane Smith",
    role: "CTO",
    image: "https://source.unsplash.com/300x300/?portrait,woman,1",
    linkedin: "https://linkedin.com",
    instagram: "https://instagram.com",
    github: "https://github.com",
  },
  {
    name: "Mike Johnson",
    role: "Lead Developer",
    image: "https://source.unsplash.com/300x300/?portrait,man,2",
    linkedin: "https://linkedin.com",
    instagram: "https://instagram.com",
    github: "https://github.com",
  },
  {
    name: "Emily Brown",
    role: "UX Designer",
    image: "https://source.unsplash.com/300x300/?portrait,woman,2",
    linkedin: "https://linkedin.com",
    instagram: "https://instagram.com",
    github: "https://github.com",
  },
  {
    name: "Alex Lee",
    role: "Marketing Manager",
    image: "https://source.unsplash.com/300x300/?portrait,person,1",
    linkedin: "https://linkedin.com",
    instagram: "https://instagram.com",
    github: "https://github.com",
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

