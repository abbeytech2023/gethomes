import { motion } from "framer-motion";

const AboutUs = () => {
  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen text-gray-800 mt-28 bg-gray-50">
      {/* Hero Section */}
      <section className="px-6 py-20 text-center text-white bg-[#144c6f] md:px-20">
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.8 }}
          className="mb-6 text-4xl font-bold md:text-6xl"
        >
          About Us
        </motion.h1>
        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 1, delay: 0.2 }}
          className="max-w-3xl mx-auto text-lg md:text-xl"
        >
          We connect people with their dream homes and trusted artisans,
          blending real estate expertise with skilled craftsmanship.
        </motion.p>
      </section>

      {/* Who We Are */}
      <section className="grid items-center gap-12 px-6 py-20 md:px-20 md:grid-cols-2">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 0.8 }}
        >
          <h2 className="mb-4 text-3xl font-semibold">Who We Are</h2>
          <p className="text-lg leading-relaxed">
            Our company is built on the belief that every property deserves a
            story and every artisan deserves recognition. We specialize in real
            estate services, helping clients buy, sell, or rent properties with
            confidence. At the same time, we provide a platform for skilled
            artisans and technicians to showcase their work, making it easier
            for clients to access trusted services.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
            alt="Real Estate"
            className="rounded-2xl shadow-xl w-full h-[350px] object-cover"
          />
        </motion.div>
      </section>

      {/* Mission & Vision */}
      <section className="grid gap-12 px-6 py-20 bg-gray-100 md:px-20 md:grid-cols-2">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 0.8 }}
        >
          <h2 className="mb-3 text-2xl font-semibold">Our Mission</h2>
          <p className="text-lg leading-relaxed">
            To simplify real estate transactions and empower artisans by
            creating opportunities that connect them directly with clients. We
            strive to deliver trust, transparency, and top-quality service in
            everything we do.
          </p>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="mb-3 text-2xl font-semibold">Our Vision</h2>
          <p className="text-lg leading-relaxed">
            To become the leading hub for real estate solutions and artisan
            marketing in the region, bridging the gap between property owners,
            buyers, and skilled professionals.
          </p>
        </motion.div>
      </section>

      {/* Core Values */}
      <section className="px-6 py-20 md:px-20">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 0.8 }}
          className="mb-12 text-3xl font-semibold text-center"
        >
          Our Core Values
        </motion.h2>

        <div className="grid gap-8 text-center md:grid-cols-3">
          {[
            {
              title: "Trust",
              desc: "Building lasting relationships through honesty and reliability.",
            },
            {
              title: "Innovation",
              desc: "Using modern solutions to connect people with homes and artisans.",
            },
            {
              title: "Excellence",
              desc: "Delivering services that exceed expectations every time.",
            },
          ].map((value, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="p-8 transition bg-white shadow-md rounded-2xl hover:shadow-xl"
            >
              <h3 className="mb-3 text-xl font-bold">{value.title}</h3>
              <p className="text-gray-600">{value.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      {/* <footer className="py-8 text-center text-white bg-blue-900">
        <p>
          &copy; {new Date().getFullYear()} Gethomes Real Estate & Artisan
          Marketing Co. All Rights Reserved.
        </p>
      </footer> */}
    </div>
  );
};

export default AboutUs;
