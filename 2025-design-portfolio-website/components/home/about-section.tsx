import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Users, Microscope, BarChart3, CheckCircle } from "lucide-react"

export default function AboutSection() {
  return (
    <>
      {/* My Approach Section */}
      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="mb-6">
              <div className="bg-green-500 dark:bg-green-500/90 rounded-full p-3 inline-flex mb-2">
                <Users className="h-6 w-6 text-green-100" />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-4">Collaborative Partnership</h3>
            <p className="text-muted-foreground">
              I work as an extension of your team, ensuring clear communication and alignment throughout the project
              lifecycle.
            </p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                <span>Regular check-ins and progress updates</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                <span>Transparent decision-making process</span>
              </li>
            </ul>
          </div>
          <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="mb-6">
              <div className="bg-green-500 dark:bg-green-500/90 rounded-full p-3 inline-flex mb-2">
                <Microscope className="h-6 w-6 text-green-100" />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-4">Evidence-Based Design</h3>
            <p className="text-muted-foreground">
              Every design decision is backed by research, testing, and data to ensure we're solving the right problems
              in the right way.
            </p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                <span>User research and usability testing</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                <span>Data-driven design iterations</span>
              </li>
            </ul>
          </div>
          <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="mb-6">
              <div className="bg-green-500 dark:bg-green-500/90 rounded-full p-3 inline-flex mb-2">
                <BarChart3 className="h-6 w-6 text-green-100" />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-4">Business-Focused Outcomes</h3>
            <p className="text-muted-foreground">
              I focus on designs that not only delight users but also drive your business metrics and support your
              strategic goals.
            </p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                <span>KPI-driven design solutions</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                <span>ROI measurement and reporting</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* About Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Image column */}
        <div className="relative h-[400px] rounded-lg overflow-hidden">
          <Image
            src="https://cezymahmqxazoloshntq.supabase.co/storage/v1/object/public/images//bju33h2432_1741740888680.png"
            alt="Portrait of the designer"
            fill
            className="object-cover rounded-lg object-[center_40%]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Content column */}
        <div>
          <h3 className="text-2xl font-bold mb-4">From biomedical engineer to designer</h3>

          <div className="space-y-4 text-muted-foreground mb-6">
            <p>
              👋🏾 I'm a product designer with a biomedical engineering background. I specialize in creating seamless
              customer experiences for tech startups and enterprises.
            </p>
            <p>
              🏥 Currently, I lead the design process at CareHive Health, where we build tools that help patients get
              quality care at affordable prices—when they need it most.
            </p>
            <p>
              ❤️ When not working, I enjoy spending time with my wife, our son, and two cats. My hobbies include
              swimming, hiking, playing piano, and watching movies.
            </p>
          </div>

          <Button asChild variant="outline" className="group">
            <Link href="/about" className="flex items-center">
              Learn more about me
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </>
  )
}
