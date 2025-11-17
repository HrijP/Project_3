'use client'

import { useState } from 'react'
import Header from '@/components/header'
import Navigation from '@/components/navigation'
import Section from '@/components/section'
import Footer from '@/components/footer'

export default function Home() {
  const [activeSection, setActiveSection] = useState('intro')

  const sections = [
    { id: 'intro', label: 'Introduction' },
    { id: 'part1', label: 'Part 1' },
    { id: 'part2', label: 'Part 2' },
    { id: 'conclusion', label: 'Conclusion' },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Navigation sections={sections} activeSection={activeSection} setActiveSection={setActiveSection} />

      <main className="max-w-4xl mx-auto px-6 py-12 space-y-12">
        <Section id="intro" title="Introduction" isActive={activeSection === 'intro'}>
          <p className="text-base leading-relaxed text-muted-foreground">
            Object detection requires predicting both object class and location. This project implements
            a lightweight SSD-like model using a MobileNetV2 backbone trained on the Banana Detection Dataset.
            We additionally implement Non-Maximum Suppression (NMS) from scratch and compare it with PyTorch.
          </p>
        </Section>

        <Section id="part1" title="Part 1: Lightweight Object Detection" isActive={activeSection === 'part1'}>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-3">Model Architecture</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our model uses MobileNetV2 as a feature extractor, followed by SSD-style prediction heads
                that output bounding box offsets and class logits. Anchors were generated across multiple
                feature maps with various scales and aspect ratios.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Training Setup</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">•</span>
                  <span>Epochs: 20–30</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">•</span>
                  <span>Batch size: 16</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">•</span>
                  <span>Optimizer: Adam (1e-3)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">•</span>
                  <span>Loss = classification + Smooth L1 regression</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Loss Curves</h3>
              <div className="grid gap-4">
                <div className="bg-card border border-border rounded-lg overflow-hidden">
                  <img 
                    src="/class_loss.png" 
                    alt="Classification Loss Curve" 
                    className="w-full h-auto"
                  />
                </div>
                <div className="bg-card border border-border rounded-lg overflow-hidden">
                  <img 
                    src="/bbox_loss.png" 
                    alt="Bounding Box Loss Curve" 
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Sample Detections</h3>
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                <img 
                  src="/detections.png" 
                  alt="Sample detection results" 
                  className="w-full h-auto"
                />
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Custom Banana Tests</h3>
              <p className="text-muted-foreground leading-relaxed">
                All custom banana images taken from a phone were detected successfully.
              </p>
            </div>
          </div>
        </Section>

        <Section id="part2" title="Part 2: Non-Maximum Suppression" isActive={activeSection === 'part2'}>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-3">Our NMS Implementation</h3>
              <p className="text-muted-foreground leading-relaxed mb-3">
                We implemented NMS manually:
              </p>
              <ol className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-accent font-semibold">1.</span>
                  <span>Sort boxes by confidence</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent font-semibold">2.</span>
                  <span>Keep the highest-scoring box</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent font-semibold">3.</span>
                  <span>Compute IoU, remove boxes above threshold</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent font-semibold">4.</span>
                  <span>Repeat</span>
                </li>
              </ol>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="text-lg font-semibold mb-3">Before NMS</h3>
                <div className="bg-card border border-border rounded-lg overflow-hidden">
                  <img 
                    src="/before_nms.png" 
                    alt="Before NMS visualization" 
                    className="w-full h-auto"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">After NMS</h3>
                <div className="bg-card border border-border rounded-lg overflow-hidden">
                  <img 
                    src="/after_nms.png" 
                    alt="After NMS visualization" 
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Comparison with PyTorch</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">•</span>
                  <span>Results match ~95% of the time</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">•</span>
                  <span>Differences mostly due to floating-point rounding</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">•</span>
                  <span>PyTorch NMS is significantly faster (CUDA optimized)</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Limitations</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">•</span>
                  <span>Hard IoU threshold can remove true positives</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">•</span>
                  <span>Fails with closely packed objects</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">•</span>
                  <span>NMS is not learnable — purely heuristic</span>
                </li>
              </ul>
            </div>
          </div>
        </Section>

        <Section id="conclusion" title="Conclusion" isActive={activeSection === 'conclusion'}>
          <p className="text-base leading-relaxed text-muted-foreground">
            The MobileNet-based SSD detector performed reliably on the banana dataset. NMS successfully reduced
            duplicate predictions and matched PyTorch's implementation. Limitations appear in crowded scenes and
            unusual lighting. Future improvements include Soft-NMS, DIoU-NMS, and stronger augmentations.
          </p>
        </Section>
      </main>

      <Footer />
    </div>
  )
}
