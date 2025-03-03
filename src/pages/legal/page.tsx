"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, AlertCircle } from "lucide-react"
import FloatingShapes from "@/components/ui/floating-shapes"
import { useNavigate } from "react-router-dom"

const termsContent = `
1. Acceptance of Terms

By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.

2. Use License

Permission is granted to temporarily download one copy of the materials (information or software) on our website for personal, non-commercial transitory viewing only.

3. Disclaimer

The materials on our website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.

4. Limitations

In no event shall we or our suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website, even if we or an authorized representative has been notified orally or in writing of the possibility of such damage.

5. Revisions and Errata

The materials appearing on our website could include technical, typographical, or photographic errors. We do not warrant that any of the materials on its website are accurate, complete or current. We may make changes to the materials contained on its website at any time without notice.

6. Links

We have not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by us of the site. Use of any such linked website is at the user's own risk.

7. Governing Law

Any claim relating to our website shall be governed by the laws of the country of residence without regard to its conflict of law provisions.
`

const privacyContent = `
1. Information Collection

We collect information from you when you register on our site, place an order, subscribe to our newsletter, respond to a survey or fill out a form. When ordering or registering on our site, as appropriate, you may be asked to enter your name, e-mail address, mailing address, phone number or credit card information.

2. Information Use

Any of the information we collect from you may be used in one of the following ways:
- To personalize your experience (your information helps us to better respond to your individual needs)
- To improve our website (we continually strive to improve our website offerings based on the information and feedback we receive from you)
- To improve customer service (your information helps us to more effectively respond to your customer service requests and support needs)
- To process transactions
- To send periodic emails

3. Information Protection

We implement a variety of security measures to maintain the safety of your personal information when you place an order or enter, submit, or access your personal information.

We offer the use of a secure server. All supplied sensitive/credit information is transmitted via Secure Socket Layer (SSL) technology and then encrypted into our Payment gateway providers database only to be accessible by those authorized with special access rights to such systems, and are required to keep the information confidential.

4. Cookie Usage

Cookies are small files that a site or its service provider transfers to your computers hard drive through your Web browser (if you allow) that enables the sites or service providers systems to recognize your browser and capture and remember certain information.

We use cookies to help us remember and process the items in your shopping cart, understand and save your preferences for future visits and compile aggregate data about site traffic and site interaction so that we can offer better site experiences and tools in the future.

5. Information Disclosure

We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential. We may also release your information when we believe release is appropriate to comply with the law, enforce our site policies, or protect ours or others rights, property, or safety.

6. Third Party Links

Occasionally, at our discretion, we may include or offer third party products or services on our website. These third party sites have separate and independent privacy policies. We therefore have no responsibility or liability for the content and activities of these linked sites.

7. Online Privacy Policy Only

This online privacy policy applies only to information collected through our website and not to information collected offline.

8. Consent

By using our site, you consent to our privacy policy.
`

export default function LegalPage() {

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("terms")
  const [progress, setProgress] = useState(0)
  const [agreed, setAgreed] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(activeTab === "terms" ? 50 : 100)
    }, 1000)
    return () => clearTimeout(timer)
  }, [activeTab])

  const handleSubmit = () => {
    if (agreed && progress === 100) {
      setSubmitted(true);
      setIsLoading(true); // Show loading state
  
      setTimeout(() => {
        setIsLoading(false); // Hide loading before navigating
        navigate("/landing");
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white relative overflow-hidden">
      <FloatingShapes />

      <div className="container mx-auto px-4 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Legal Information</h1>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="terms">Terms of Service</TabsTrigger>
                <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
              </TabsList>
              <Progress value={progress} className="mb-6" />
              <TabsContent value="terms">
                <ScrollArea className="h-96 rounded-md border p-4">
                  <div className="prose prose-blue max-w-none">
                    {termsContent.split("\n\n").map((paragraph, index) => (
                      <motion.p
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        {paragraph}
                      </motion.p>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
              <TabsContent value="privacy">
                <ScrollArea className="h-96 rounded-md border p-4">
                  <div className="prose prose-blue max-w-none">
                    {privacyContent.split("\n\n").map((paragraph, index) => (
                      <motion.p
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        {paragraph}
                      </motion.p>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>

            <div className="mt-6 flex items-center space-x-2">
                <input
                    type="checkbox"
                    id="agreement"
                    className="peer hidden"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                />
                <div
                    className={`w-5 h-5 flex items-center justify-center border-2 border-gray-400 rounded-md cursor-pointer transition-all
                    ${agreed ? "bg-blue-500 border-blue-500" : "bg-white border-gray-400"}`}
                    onClick={() => setAgreed(!agreed)}
                >
                    {agreed && <svg className="w-4 h-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z" clipRule="evenodd" />
                    </svg>}
                </div>
                <label
                    htmlFor="agreement"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    I have read and agree to the Terms of Service and Privacy Policy
                </label>
                </div>


            <div className="mt-6">
              <Button
                onClick={handleSubmit}
                disabled={!agreed || progress !== 100}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Submit Agreement
              </Button>
            </div>

            <AnimatePresence>
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mt-6 p-4 bg-green-100 rounded-md flex items-center space-x-2"
                >
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <span className="text-green-800">
                    {isLoading ? "Processing..." : "Thank you for agreeing to our terms and privacy policy!"}
                    </span>
                </motion.div>
              )}
            </AnimatePresence>

            {progress < 100 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-yellow-100 rounded-md flex items-center space-x-2"
              >
                <AlertCircle className="w-5 h-5 text-yellow-600" />
                <span className="text-yellow-800">
                  Please read both the Terms of Service and Privacy Policy before submitting.
                </span>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

